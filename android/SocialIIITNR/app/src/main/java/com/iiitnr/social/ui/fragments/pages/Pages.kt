package com.iiitnr.social.ui.fragments.pages

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import com.iiitnr.social.R
import com.iiitnr.social.databinding.FragmentPagesBinding
import com.iiitnr.social.databinding.FragmentPostDetailBinding
import com.iiitnr.social.ui.fragments.BaseFragment
import dagger.hilt.android.AndroidEntryPoint


@AndroidEntryPoint
class Pages : BaseFragment() {

    private var _binding: FragmentPagesBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentPagesBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.entrepreneurCell.setOnClickListener{
            findNavController().navigate(R.id.action_pages_to_ecell)
        }
        binding.trainingP.setOnClickListener{
            findNavController().navigate(R.id.action_pages_to_tnp)
        }
    }

}